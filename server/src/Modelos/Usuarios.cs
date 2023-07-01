using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Usuarios
{
    public int IntIdUsuario { get; set; }

    public string StrCedula { get; set; } = null!;

    public string StrUsuario { get; set; } = null!;

    public string StrNombres { get; set; } = null!;

    public string StringApellidos { get; set; } = null!;

    public DateTime? DtFechaNac { get; set; }

    public string? CharGenero { get; set; }

    public string StrCorreo { get; set; } = null!;

    public string? StrDireccion { get; set; }

    public string? StrTelefono { get; set; }

    public string StrContraseña { get; set; } = null!;

    public string CharEstado { get; set; } = null!;

    public int IntIdRol { get; set; }

    public string? TxtImagen { get; set; }

    public DateTime? DtFechaCreacion { get; set; }

    public virtual ICollection<Farmacias> Farmacia { get; set; } = new List<Farmacias>();

    public virtual Medicos? Medico { get; set; }

    public virtual Pacientes? Paciente { get; set; }

    public virtual ICollection<Recetas> RecetaIntIdMedicoNavigations { get; set; } = new List<Recetas>();

    public virtual ICollection<Recetas> RecetaIntIdPacienteNavigations { get; set; } = new List<Recetas>();
}
