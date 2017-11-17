using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class UpdateTable_TaxomomyEntity_AddParentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ParentId",
                table: "TaxonomyEntity",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Area",
                table: "ConstructionDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Customer",
                table: "ConstructionDetail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyEntity_ParentId",
                table: "TaxonomyEntity",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaxonomyEntity_TaxonomyEntity_ParentId",
                table: "TaxonomyEntity",
                column: "ParentId",
                principalTable: "TaxonomyEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaxonomyEntity_TaxonomyEntity_ParentId",
                table: "TaxonomyEntity");

            migrationBuilder.DropIndex(
                name: "IX_TaxonomyEntity_ParentId",
                table: "TaxonomyEntity");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "TaxonomyEntity");

            migrationBuilder.DropColumn(
                name: "Area",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "Customer",
                table: "ConstructionDetail");
        }
    }
}
