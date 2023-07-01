using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Medicaciones
{
    public int IntIdMedicacion { get; set; }

    public string? StrNombre { get; set; }

    public string? TxtDescripcion { get; set; }

    public virtual ICollection<RecetaMedicaciones> RecetaMedicacions { get; set; } = new List<RecetaMedicaciones>();
}
