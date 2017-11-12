using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class SettingEntity_UpdateManyToManyKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConstructionEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastUpdateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionEntity", x => x.Id);
                    table.UniqueConstraint("AK_ConstructionEntity_Name", x => x.Name);
                    table.ForeignKey(
                        name: "FK_ConstructionEntity_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConstructionEntity_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConstructionEntity_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConstructionDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateByUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Entity = table.Column<long>(type: "bigint", nullable: false),
                    EntityIdId = table.Column<long>(type: "bigint", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConstructionDetail_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConstructionDetail_ConstructionEntity_EntityIdId",
                        column: x => x.EntityIdId,
                        principalTable: "ConstructionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConstructionFile",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    FileEntityId = table.Column<long>(type: "bigint", nullable: false),
                    UsingType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionFile", x => new { x.EntityId, x.FileEntityId });
                    table.ForeignKey(
                        name: "FK_ConstructionFile_ConstructionEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ConstructionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConstructionFile_FileEntity_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConstructionTaxonomy",
                columns: table => new
                {
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    TaxonomyId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionTaxonomy", x => new { x.EntityId, x.TaxonomyId });
                    table.ForeignKey(
                        name: "FK_ConstructionTaxonomy_ConstructionEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "ConstructionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConstructionTaxonomy_TaxonomyEntity_TaxonomyId",
                        column: x => x.TaxonomyId,
                        principalTable: "TaxonomyEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionDetail_CreateByUserId",
                table: "ConstructionDetail",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionDetail_EntityIdId",
                table: "ConstructionDetail",
                column: "EntityIdId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionEntity_CreateByUserId",
                table: "ConstructionEntity",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionEntity_DeleteByUserId",
                table: "ConstructionEntity",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionEntity_LastUpdateByUserId",
                table: "ConstructionEntity",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionFile_FileEntityId",
                table: "ConstructionFile",
                column: "FileEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionTaxonomy_TaxonomyId",
                table: "ConstructionTaxonomy",
                column: "TaxonomyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConstructionDetail");

            migrationBuilder.DropTable(
                name: "ConstructionFile");

            migrationBuilder.DropTable(
                name: "ConstructionTaxonomy");

            migrationBuilder.DropTable(
                name: "ConstructionEntity");
        }
    }
}
