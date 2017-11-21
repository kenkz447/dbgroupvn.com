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

            foreach (var con in constructions)
            {
                var filteredDetails = con.Details.Where(o => o.Language == Thread.CurrentThread.CurrentCulture.Name);
                if (filteredDetails.Count() != 0)
                    con.Details = filteredDetails;
                else
                    con.Details = filteredDetails.Where(o => o.Language == "vi");
            }

            foreach (var taxonomyName in serviceModel.TaxonomyNames)
                if(taxonomyName != default)
                    constructions = constructions.Where(o => o.EntityTaxonomies.Select(e => e.Taxonomy.Name).Contains(taxonomyName));

            constructions = constructions.OrderByDescending(o => o.Id);

            var result = await PaginatedList<ConstructionEntity>.CreateAsync(constructions, serviceModel.Page, serviceModel.PageSize);

            return result;
        }

        public async Task<ConstructionEntity> GetNextConstruction(long constructionId)
        {
            var con = await GetConstructions().AsNoTracking().FirstOrDefaultAsync(o => o.Id > constructionId);
            if (con == null)
                return null;

            var filteredDetails = con.Details.Where(o => o.Language == Thread.CurrentThread.CurrentCulture.Name);
            if (filteredDetails.Count() != 0)
                con.Details = filteredDetails;
            else
                con.Details = filteredDetails.Where(o => o.Language == "vi");

            return con;
        }

        public async Task<ConstructionEntity> GetPrevConstruction(long constructionId)
        {
            var con = await GetConstructions().AsNoTracking().Where(o => o.Id < constructionId).OrderByDescending(o => o.Id).FirstOrDefaultAsync();
            if (con == null)
                return null;

            var filteredDetails = con.Details.Where(o => o.Language == Thread.CurrentThread.CurrentCulture.Name);
            if (filteredDetails.Count() != 0)
                con.Details = filteredDetails;
            else
                con.Details = filteredDetails.Where(o => o.Language == "vi");
            return con;
        }

        public async Task<ConstructionEntity> GetConstructionById(long constructionId)
        {
            var con = await GetConstructions().AsNoTracking().SingleAsync(o => o.Id == constructionId);
            var filteredDetails = con.Details.Where(o => o.Language == Thread.CurrentThread.CurrentCulture.Name);
            if (filteredDetails.Count() != 0)
                con.Details = filteredDetails;
            else
                con.Details = filteredDetails.Where(o => o.Language == "vi");
            return con;
        }

        public async Task<ConstructionEntity> GetConstructionByName(string constructionName)
        {
            var con = await GetConstructions().AsNoTracking().SingleAsync(o => o.Name == constructionName);
            var filteredDetails = con.Details.Where(o => o.Language == Thread.CurrentThread.CurrentCulture.Name);
            if (filteredDetails.Count() != 0)
                con.Details = filteredDetails;
            else
                con.Details = filteredDetails.Where(o => o.Language == "vi");
            return con;
        }

        public async Task<ConstructionEntity> CreateNewConstruction(ConstructionServiceModel serviceModel)
        {
            serviceModel.Detail.Language = Thread.CurrentThread.Name;

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

            foreach (var newDetail in newConstruction.Details)
            {
                newDetail.Language = Thread.CurrentThread.CurrentCulture.Name;
                var oldDetail = construction.Details.FirstOrDefault(o => o.Language == newDetail.Language);
                if (oldDetail != null)
                {
                    newDetail.Id = oldDetail.Id;
                    _context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
                }
                else
                    _context.Set<ConstructionDetail>().Add(newDetail);
            }

            _context.TryUpdateManyToMany(construction.EnitityFiles, newConstruction.EnitityFiles, o => o.FileEntityId);
            _context.TryUpdateManyToMany(construction.EntityTaxonomies, newConstruction.EntityTaxonomies, o => o.TaxonomyId);

            await _context.SaveChangesAsync();

            return newConstruction;
        }
    }
}