using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Gestion_recetas.Models;

public partial class GesRecContext : DbContext
{
    public GesRecContext()
    {
    }

    public GesRecContext(DbContextOptions<GesRecContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Farmacias> Farmacias { get; set; }

    public virtual DbSet<Medicaciones> Medicacions { get; set; }

    public virtual DbSet<Medicos> Medicos { get; set; }

    public virtual DbSet<Modulos> Modulos { get; set; }

    public virtual DbSet<Operaciones> Operaciones { get; set; }

    public virtual DbSet<Pacientes> Pacientes { get; set; }

    public virtual DbSet<Permisos> Permisos { get; set; }

    public virtual DbSet<Recetas> Recetas { get; set; }

    public virtual DbSet<RecetaComentarios> RecetaComentarios { get; set; }

    public virtual DbSet<RecetaMedicaciones> RecetaMedicacions { get; set; }

    public virtual DbSet<Roles> Roles { get; set; }

    public virtual DbSet<Usuarios> Usuarios { get; set; }

    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DONWEBON;Database=ges_rec;Trusted_Connection=True;TrustServerCertificate=True;");*/

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Farmacias>(entity =>
        {
            entity.HasKey(e => e.IntIdFarmacia).HasName("PK_farmacias_id_farmacia");

            entity.ToTable("farmacias", "ges_recetas");

            entity.HasIndex(e => e.IntIdUsuario, "id_usuario");

            entity.Property(e => e.IntIdFarmacia).HasColumnName("int_id_farmacia");
            entity.Property(e => e.IntIdUsuario).HasColumnName("int_id_usuario");
            entity.Property(e => e.StrCelularInstitucion)
                .HasMaxLength(10)
                .HasColumnName("str_celular_institucion");
            entity.Property(e => e.StrCorreoInstitucion)
                .HasMaxLength(255)
                .HasColumnName("str_correo_institucion");
            entity.Property(e => e.StrDireccionInstitucion)
                .HasMaxLength(255)
                .HasColumnName("str_direccion_institucion");
            entity.Property(e => e.StrImagenLogo)
                .HasColumnType("text")
                .HasColumnName("str_imagen_logo");
            entity.Property(e => e.StrNombreInstitucion)
                .HasMaxLength(255)
                .HasColumnName("str_nombre_institucion");
            entity.Property(e => e.StrRuc)
                .HasMaxLength(13)
                .HasColumnName("str_ruc");
            entity.Property(e => e.StrTelefonoInstitucion)
                .HasMaxLength(10)
                .HasColumnName("str_telefono_institucion");

            entity.HasOne(d => d.IntIdUsuarioNavigation).WithMany(p => p.Farmacia)
                .HasForeignKey(d => d.IntIdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("farmacias$farmacias_ibfk_1");
        });

        modelBuilder.Entity<Medicaciones>(entity =>
        {
            entity.HasKey(e => e.IntIdMedicacion).HasName("PK_medicacion_id_medicacion");

            entity.ToTable("medicacion", "ges_recetas");

            entity.Property(e => e.IntIdMedicacion).HasColumnName("int_id_medicacion");
            entity.Property(e => e.StrNombre)
                .HasMaxLength(100)
                .HasColumnName("str_nombre");
            entity.Property(e => e.TxtDescripcion)
                .HasColumnType("text")
                .HasColumnName("txt_descripcion");
        });

        modelBuilder.Entity<Medicos>(entity =>
        {
            entity.HasKey(e => e.IntIdUsuarios).HasName("PK_medicos_id_usuario");

            entity.ToTable("medicos", "ges_recetas");

            entity.Property(e => e.IntIdUsuarios)
                .ValueGeneratedNever()
                .HasColumnName("int_id_usuarios");
            entity.Property(e => e.StrEspecialidades)
                .HasMaxLength(255)
                .HasColumnName("str_especialidades");

            entity.HasOne(d => d.IntIdUsuariosNavigation).WithOne(p => p.Medico)
                .HasForeignKey<Medicos>(d => d.IntIdUsuarios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medicos$medicos_ibfk_1");
        });

        modelBuilder.Entity<Modulos>(entity =>
        {
            entity.HasKey(e => e.IntIdModulo).HasName("PK_modulos_ID_MODULO");

            entity.ToTable("modulos", "ges_recetas");

            entity.Property(e => e.IntIdModulo).HasColumnName("int_id_modulo");
            entity.Property(e => e.StrNombre)
                .HasMaxLength(50)
                .HasColumnName("str_nombre");
        });

        modelBuilder.Entity<Operaciones>(entity =>
        {
            entity.HasKey(e => e.IntIdOperacion).HasName("PK_operaciones_ID_OPERACION");

            entity.ToTable("operaciones", "ges_recetas");

            entity.HasIndex(e => e.IntIdModulo, "ID_MODULO");

            entity.Property(e => e.IntIdOperacion).HasColumnName("int_id_operacion");
            entity.Property(e => e.IntIdModulo).HasColumnName("int_id_modulo");
            entity.Property(e => e.StrNombre)
                .HasMaxLength(50)
                .HasColumnName("str_nombre");

            entity.HasOne(d => d.IntIdModuloNavigation).WithMany(p => p.Operaciones)
                .HasForeignKey(d => d.IntIdModulo)
                .HasConstraintName("operaciones$operaciones_ibfk_1");
        });

        modelBuilder.Entity<Pacientes>(entity =>
        {
            entity.HasKey(e => e.IntIdUsuario).HasName("PK_pacientes_id_usuario");

            entity.ToTable("pacientes", "ges_recetas");

            entity.Property(e => e.IntIdUsuario)
                .ValueGeneratedNever()
                .HasColumnName("int_id_usuario");
            entity.Property(e => e.StrPersonaResponsable)
                .HasMaxLength(100)
                .HasColumnName("str_persona_responsable");
            entity.Property(e => e.TxtAlergias)
                .HasColumnType("text")
                .HasColumnName("txt_alergias");
            entity.Property(e => e.TxtIntervencionesQuirurgicas)
                .HasColumnType("text")
                .HasColumnName("txt_intervenciones_quirurgicas");

            entity.HasOne(d => d.IntIdUsuarioNavigation).WithOne(p => p.Paciente)
                .HasForeignKey<Pacientes>(d => d.IntIdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pacientes$pacientes_ibfk_1");
        });

        modelBuilder.Entity<Permisos>(entity =>
        {
            entity.HasKey(e => e.IntIdPermiso).HasName("PK_permisos_ID_PERMISOS");

            entity.ToTable("permisos", "ges_recetas");

            entity.HasIndex(e => e.IntIdOperacion, "ID_OPERACION");

            entity.HasIndex(e => e.IntIdRol, "ID_ROL");

            entity.Property(e => e.IntIdPermiso).HasColumnName("int_id_permiso");
            entity.Property(e => e.IntIdOperacion).HasColumnName("int_id_operacion");
            entity.Property(e => e.IntIdRol).HasColumnName("int_id_rol");

            entity.HasOne(d => d.IntIdOperacionNavigation).WithMany(p => p.Permisos)
                .HasForeignKey(d => d.IntIdOperacion)
                .HasConstraintName("permisos$permisos_ibfk_2");

            entity.HasOne(d => d.IntIdRolNavigation).WithMany(p => p.Permisos)
                .HasForeignKey(d => d.IntIdRol)
                .HasConstraintName("permisos$permisos_ibfk_1");
        });

        modelBuilder.Entity<Recetas>(entity =>
        {
            entity.HasKey(e => e.IntIdReceta).HasName("PK_recetas_id_receta");

            entity.ToTable("recetas", "ges_recetas");

            entity.HasIndex(e => e.IntIdMedico, "receta_ibfk_1");

            entity.HasIndex(e => e.IntIdPaciente, "receta_ibfk_2");

            entity.Property(e => e.IntIdReceta).HasColumnName("int_id_receta");
            entity.Property(e => e.CharEstado)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("char_estado");
            entity.Property(e => e.DtFechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dt_fecha_creacion");
            entity.Property(e => e.DtFechaExpRec)
                .HasColumnType("date")
                .HasColumnName("dt_fecha_exp_rec");
            entity.Property(e => e.IntIdMedico).HasColumnName("int_id_medico");
            entity.Property(e => e.IntIdPaciente).HasColumnName("int_id_paciente");
            entity.Property(e => e.TxtDiagnostico)
                .HasColumnType("text")
                .HasColumnName("txt_diagnostico");
            entity.Property(e => e.TxtFirmaYSello)
                .HasColumnType("text")
                .HasColumnName("txt_firma_y_sello");

            entity.HasOne(d => d.IntIdMedicoNavigation).WithMany(p => p.RecetaIntIdMedicoNavigations)
                .HasForeignKey(d => d.IntIdMedico)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("recetas$receta_ibfk_1");

            entity.HasOne(d => d.IntIdPacienteNavigation).WithMany(p => p.RecetaIntIdPacienteNavigations)
                .HasForeignKey(d => d.IntIdPaciente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("recetas$receta_ibfk_2");
        });

        modelBuilder.Entity<RecetaComentarios>(entity =>
        {
            entity.HasKey(e => e.IntIdComentario).HasName("PK_receta_comentario_id_comentario");

            entity.ToTable("receta_comentario", "ges_recetas");

            entity.HasIndex(e => e.IntIdFarmacia, "receta_cometario_ibfk_1");

            entity.HasIndex(e => e.IntIdReceta, "receta_cometario_ibfk_2");

            entity.Property(e => e.IntIdComentario).HasColumnName("int_id_comentario");
            entity.Property(e => e.IntIdFarmacia).HasColumnName("int_id_farmacia");
            entity.Property(e => e.IntIdReceta).HasColumnName("int_id_receta");
            entity.Property(e => e.TxtComentario)
                .HasColumnType("text")
                .HasColumnName("txt_comentario");

            entity.HasOne(d => d.IntIdFarmaciaNavigation).WithMany(p => p.RecetaComentarios)
                .HasForeignKey(d => d.IntIdFarmacia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receta_comentario$receta_cometario_ibfk_1");

            entity.HasOne(d => d.IntIdRecetaNavigation).WithMany(p => p.RecetaComentarios)
                .HasForeignKey(d => d.IntIdReceta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receta_comentario$receta_cometario_ibfk_2");
        });

        modelBuilder.Entity<RecetaMedicaciones>(entity =>
        {
            entity.HasKey(e => e.IntIdRecMed).HasName("PK_receta_medicacion_id_rec_med");

            entity.ToTable("receta_medicacion", "ges_recetas");

            entity.HasIndex(e => e.IntIdReceta, "receta_medicacion_ibfk_1");

            entity.HasIndex(e => e.IntIdMedicacion, "receta_medicacion_ibfk_2");

            entity.Property(e => e.IntIdRecMed).HasColumnName("int_id_rec_med");
            entity.Property(e => e.IntDuracion).HasColumnName("int_duracion");
            entity.Property(e => e.IntIdMedicacion).HasColumnName("int_id_medicacion");
            entity.Property(e => e.IntIdReceta).HasColumnName("int_id_receta");
            entity.Property(e => e.IntPauta).HasColumnName("int_pauta");
            entity.Property(e => e.IntUnidades).HasColumnName("int_unidades");

            entity.HasOne(d => d.IntIdMedicacionNavigation).WithMany(p => p.RecetaMedicacions)
                .HasForeignKey(d => d.IntIdMedicacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receta_medicacion$receta_medicacion_ibfk_2");

            entity.HasOne(d => d.IntIdRecetaNavigation).WithMany(p => p.RecetaMedicacions)
                .HasForeignKey(d => d.IntIdReceta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receta_medicacion$receta_medicacion_ibfk_1");
        });

        modelBuilder.Entity<Roles>(entity =>
        {
            entity.HasKey(e => e.IntIdRol).HasName("PK_roles_ID_ROL");

            entity.ToTable("roles", "ges_recetas");

            entity.Property(e => e.IntIdRol).HasColumnName("int_id_rol");
            entity.Property(e => e.StrNombre)
                .HasMaxLength(50)
                .HasColumnName("str_nombre");
        });

        modelBuilder.Entity<Usuarios>(entity =>
        {
            entity.HasKey(e => e.IntIdUsuario).HasName("PK_usuarios_ID_USUARIO");

            entity.ToTable("usuarios", "ges_recetas");

            entity.HasIndex(e => e.IntIdRol, "ID_ROL");

            entity.Property(e => e.IntIdUsuario).HasColumnName("int_id_usuario");
            entity.Property(e => e.CharEstado)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("char_estado");
            entity.Property(e => e.CharGenero)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("char_genero");
            entity.Property(e => e.DtFechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dt_fecha_creacion");
            entity.Property(e => e.DtFechaNac)
                .HasColumnType("date")
                .HasColumnName("dt_fecha_nac");
            entity.Property(e => e.IntIdRol).HasColumnName("int_id_rol");
            entity.Property(e => e.StrCedula)
                .HasMaxLength(10)
                .HasColumnName("str_cedula");
            entity.Property(e => e.StrContraseña)
                .HasMaxLength(50)
                .HasColumnName("str_contraseña");
            entity.Property(e => e.StrCorreo)
                .HasMaxLength(50)
                .HasColumnName("str_correo");
            entity.Property(e => e.StrDireccion)
                .HasMaxLength(50)
                .HasColumnName("str_direccion");
            entity.Property(e => e.StrNombres)
                .HasMaxLength(50)
                .HasColumnName("str_nombres");
            entity.Property(e => e.StrTelefono)
                .HasMaxLength(20)
                .HasColumnName("str_telefono");
            entity.Property(e => e.StrUsuario)
                .HasMaxLength(50)
                .HasColumnName("str_usuario");
            entity.Property(e => e.StringApellidos)
                .HasMaxLength(50)
                .HasColumnName("string_apellidos");
            entity.Property(e => e.TxtImagen)
                .HasColumnType("text")
                .HasColumnName("txt_imagen");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
