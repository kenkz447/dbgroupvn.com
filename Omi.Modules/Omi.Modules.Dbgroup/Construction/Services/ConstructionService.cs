using Omi.Base;
using Omi.Modules.Dbgroup.Construction.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Dbgroup.Construction.Services
{
    public class ConstructionService
    {
        public DbgroupDbContext _context { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public ConstructionEntity Create<TCreateModel>(TCreateModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public bool Delete<TDeleteModel>(TDeleteModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ConstructionEntity> GetEntities<TGetModel>(TGetModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public ConstructionEntity Read<TReadModel>(TReadModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public ConstructionEntity Update<TUpdateModel>(TUpdateModel serviceModel)
        {
            throw new NotImplementedException();
        }
    }
}
