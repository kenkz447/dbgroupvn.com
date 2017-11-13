using Microsoft.EntityFrameworkCore;
using Omi.Base.Collection;
using Omi.Extensions;
using Omi.Modules.Dbgroup;
using Omi.Modules.Dbgroup.Construction.Entities;
using Omi.Modules.Dbgroup.Construction.Seed;
using Omi.Modules.Dbgroup.ServiceModels;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Omi.Modules.Dbgroup.Services
{
    public class ConstructionService
    {
        private readonly DbgroupDbContext _context;
        public ConstructionService(DbgroupDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TaxonomyEntity> GetAllConstructionType()
            => _context.TaxonomyEntity
            .Include(o => o.Details)
            .Include(o => o.Children)
            .ThenInclude(o => o.Details)
            .Where(o => o.TaxonomyTypeId == ConstructionCategoriesSeed.ConstructionType.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllConstructionStatus()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == ConstructionStatusSeed.ConstructionStatus.Id).AsNoTracking();

        private IQueryable<ConstructionEntity> GetConstructions()
            => _context.ConstructionEntity
            .Include(o => o.Details)
            .Include(o => o.EnitityFiles)
            .ThenInclude(o => o.FileEntity)
            .Include(o => o.EntityTaxonomies)
            .ThenInclude(o => o.Taxonomy)
            .ThenInclude(o => o.Details)
            .AsQueryable();

        public async Task<PaginatedList<ConstructionEntity>> GetConstructions(ConstructionFilterServiceModel serviceModel)
        {
            var constructions = GetConstructions().AsNoTracking();

            foreach (var taxonomyId in serviceModel.TaxonomyIds)
                if(taxonomyId != default(long))
                    constructions = constructions.Where(o => o.EntityTaxonomies.Select(e => e.TaxonomyId).Contains(taxonomyId));

            constructions = constructions.OrderByDescending(o => o.Id);

            var result = await PaginatedList<ConstructionEntity>.CreateAsync(constructions, serviceModel.Page, serviceModel.PageSize);

            return result;
        }

        public async Task<ConstructionEntity> GetNextConstruction(long constructionId)
            => await GetConstructions().AsNoTracking().FirstOrDefaultAsync(o => o.Id > constructionId);

        public async Task<ConstructionEntity> GetPrevConstruction(long constructionId)
            => await GetConstructions().AsNoTracking().Where(o => o.Id < constructionId).OrderByDescending(o => o.Id).FirstOrDefaultAsync();

        public async Task<ConstructionEntity> GetConstructionById(long constructionId)
            => await GetConstructions().AsNoTracking().SingleAsync(o => o.Id == constructionId);

        public async Task<ConstructionEntity> GetConstructionByName(string constructionName)
            => await GetConstructions().AsNoTracking().SingleAsync(o => o.Name == constructionName);

        public async Task<ConstructionEntity> CreateNewConstruction(ConstructionServiceModel serviceModel)
        {
            var newConstruction = new ConstructionEntity
            {
                Name = serviceModel.Name,
                CreateByUserId = serviceModel.User.Id,
                Details = new List<ConstructionDetail>() {
                    serviceModel.Detail
                },
                EnitityFiles = serviceModel.GetEntityFiles(),
                EntityTaxonomies = new List<ConstructionTaxonomy>(
                    serviceModel.TaxonomyIds.Select(taxonomyId => new ConstructionTaxonomy { TaxonomyId = taxonomyId }))
            };

            var add = await _context.ConstructionEntity.AddAsync(newConstruction);

            _context.SaveChanges();

            return add.Entity;
        }

        public async Task<ConstructionEntity> UpdateConstructionAsync(ConstructionServiceModel serviceModel)
        {
            var construction = await GetConstructions().SingleAsync(o => o.Id == serviceModel.Id);
            var newConstruction = ConstructionEntityExt.FromServiceModel(serviceModel);

            _context.Entry(construction).CurrentValues.SetValues(newConstruction);
            _context.Entry(construction).Property(o => o.CreateByUserId).IsModified = false;
            _context.Entry(construction).Property(o => o.CreateDate).IsModified = false;

            var currentInputLanguage = Thread.CurrentThread.CurrentCulture.Name;

            foreach (var newDetail in newConstruction.Details)
            {
                var oldDetail = construction.Details.FirstOrDefault(o => o.Language == currentInputLanguage);
                if(oldDetail == null)
                    oldDetail = construction.Details.FirstOrDefault(o => o.Language == null);

                newDetail.Id = oldDetail.Id;
                _context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
            }

            _context.TryUpdateManyToMany(construction.EnitityFiles, newConstruction.EnitityFiles, o => o.FileEntityId);
            _context.TryUpdateManyToMany(construction.EntityTaxonomies, newConstruction.EntityTaxonomies, o => o.TaxonomyId);

            await _context.SaveChangesAsync();

            return newConstruction;
        }
    }
}