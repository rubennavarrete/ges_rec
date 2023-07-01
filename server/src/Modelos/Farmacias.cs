using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Farmacias
{
    public int IntIdFarmacia { get; set; }

    public int IntIdUsuario { get; set; }

    public string? StrRuc { get; set; }

    public string? StrNombreInstitucion { get; set; }

    public string? StrDireccionInstitucion { get; set; }

    public string? StrCorreoInstitucion { get; set; }

    public string? StrTelefonoInstitucion { get; set; }

    public string? StrCelularInstitucion { get; set; }

    public string? StrImagenLogo { get; set; }

    public virtual Usuarios IntIdUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<RecetaComentarios> RecetaComentarios { get; set; } = new List<RecetaComentarios>();
}
