using System;
using System.Collections.Generic;

namespace Gestion_recetas.Models;

public partial class RecetaMedicaciones
{
    public int IntIdRecMed { get; set; }

    public int IntIdReceta { get; set; }

    public int IntIdMedicacion { get; set; }

    public int IntUnidades { get; set; }

    public int IntPauta { get; set; }

    public int IntDuracion { get; set; }

    public virtual Medicaciones IntIdMedicacionNavigation { get; set; } = null!;

    public virtual Recetas IntIdRecetaNavigation { get; set; } = null!;
}
