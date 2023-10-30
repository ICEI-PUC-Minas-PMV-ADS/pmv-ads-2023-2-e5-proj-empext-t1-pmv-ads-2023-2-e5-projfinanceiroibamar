using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_financeiro_ibamar.Migrations
{
    /// <inheritdoc />
    public partial class M07Adicionando_informacoes_Membros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CEP",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Logradouro",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Numero",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UF",
                table: "Membros",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "CEP",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "Logradouro",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "Numero",
                table: "Membros");

            migrationBuilder.DropColumn(
                name: "UF",
                table: "Membros");
        }
    }
}
