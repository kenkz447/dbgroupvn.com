using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class UpdateConstructionEntityDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConstructionDetail_ConstructionEntity_EntityIdId",
                table: "ConstructionDetail");

            migrationBuilder.DropIndex(
                name: "IX_ConstructionDetail_EntityIdId",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "Entity",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "EntityIdId",
                table: "ConstructionDetail");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ConstructionDetail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EntityId",
                table: "ConstructionDetail",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "FinishDate",
                table: "ConstructionDetail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "ConstructionDetail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionDetail_EntityId",
                table: "ConstructionDetail",
                column: "EntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ConstructionDetail_ConstructionEntity_EntityId",
                table: "ConstructionDetail",
                column: "EntityId",
                principalTable: "ConstructionEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConstructionDetail_ConstructionEntity_EntityId",
                table: "ConstructionDetail");

            migrationBuilder.DropIndex(
                name: "IX_ConstructionDetail_EntityId",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "ConstructionDetail");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "ConstructionDetail");

            migrationBuilder.AddColumn<long>(
                name: "Entity",
                table: "ConstructionDetail",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "EntityIdId",
                table: "ConstructionDetail",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionDetail_EntityIdId",
                table: "ConstructionDetail",
                column: "EntityIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_ConstructionDetail_ConstructionEntity_EntityIdId",
                table: "ConstructionDetail",
                column: "EntityIdId",
                principalTable: "ConstructionEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
