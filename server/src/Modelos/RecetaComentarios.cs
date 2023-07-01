using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class RecetaComentarios
{
    public int IntIdComentario { get; set; }

    public int IntIdReceta { get; set; }

    public int IntIdFarmacia { get; set; }

    public string TxtComentario { get; set; } = null!;

    public virtual Farmacias IntIdFarmaciaNavigation { get; set; } = null!;

    public virtual Recetas IntIdRecetaNavigation { get; set; } = null!;
}
