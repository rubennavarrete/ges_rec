using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Roles
{
    public int IntIdRol { get; set; }

    public string StrNombre { get; set; } = null!;

    public virtual ICollection<Permisos> Permisos { get; set; } = new List<Permisos>();
}
