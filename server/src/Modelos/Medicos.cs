using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class Medicos
{
    public int IntIdUsuarios { get; set; }

    public string? StrEspecialidades { get; set; }

    public virtual Usuarios IntIdUsuariosNavigation { get; set; } = null!;
}
