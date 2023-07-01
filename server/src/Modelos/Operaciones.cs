using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Operaciones
{
    public int IntIdOperacion { get; set; }

    public string StrNombre { get; set; } = null!;

    public int? IntIdModulo { get; set; }

    public virtual Modulos? IntIdModuloNavigation { get; set; }

    public virtual ICollection<Permisos> Permisos { get; set; } = new List<Permisos>();
}
