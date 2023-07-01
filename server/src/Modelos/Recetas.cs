using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Recetas
{
    public int IntIdReceta { get; set; }

    public int IntIdMedico { get; set; }

    public int IntIdPaciente { get; set; }

    public string? TxtFirmaYSello { get; set; }

    public string? TxtDiagnostico { get; set; }

    public string? CharEstado { get; set; }

    public DateTime? DtFechaExpRec { get; set; }

    public DateTime? DtFechaCreacion { get; set; }

    public virtual Usuarios IntIdMedicoNavigation { get; set; } = null!;

    public virtual Usuarios IntIdPacienteNavigation { get; set; } = null!;

    public virtual ICollection<RecetaComentarios> RecetaComentarios { get; set; } = new List<RecetaComentarios>();

    public virtual ICollection<RecetaMedicaciones> RecetaMedicacions { get; set; } = new List<RecetaMedicaciones>();
}
