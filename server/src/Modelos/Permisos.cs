using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Permisos
{
    public int IntIdPermiso { get; set; }

    public int? IntIdRol { get; set; }

    public int? IntIdOperacion { get; set; }

    public virtual Operaciones? IntIdOperacionNavigation { get; set; }

    public virtual Roles? IntIdRolNavigation { get; set; }
}
