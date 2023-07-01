using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Pacientes
{
    public int IntIdUsuario { get; set; }

    public string? StrPersonaResponsable { get; set; }

    public string? TxtAlergias { get; set; }

    public string? TxtIntervencionesQuirurgicas { get; set; }

    public virtual Usuarios IntIdUsuarioNavigation { get; set; } = null!;
}
