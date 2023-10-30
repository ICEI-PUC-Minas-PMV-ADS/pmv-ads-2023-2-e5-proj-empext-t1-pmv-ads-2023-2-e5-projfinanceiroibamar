using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_financeiro_ibamar.Migrations
{
    /// <inheritdoc />
    public partial class M02Atualizando_Contas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Saldo",
                table: "contas",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Saldo",
                table: "contas");
        }
    }
}
