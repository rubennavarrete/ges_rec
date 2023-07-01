using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Modulos
{
    public int IntIdModulo { get; set; }

    public string StrNombre { get; set; } = null!;

    public virtual ICollection<Operaciones> Operaciones { get; set; } = new List<Operaciones>();
}
