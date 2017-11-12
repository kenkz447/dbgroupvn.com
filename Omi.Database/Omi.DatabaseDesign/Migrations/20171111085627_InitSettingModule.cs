using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class InitSettingModule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaxonomyDetail_Taxonomy_TaxonomyId",
                table: "TaxonomyDetail");

            migrationBuilder.DropTable(
                name: "Taxonomy");

            migrationBuilder.DropIndex(
                name: "IX_TaxonomyDetail_TaxonomyId",
                table: "TaxonomyDetail");

            migrationBuilder.DropColumn(
                name: "TaxonomyId",
                table: "TaxonomyDetail");

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateByUserId",
                table: "TaxonomyType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "TaxonomyType",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EntityId",
                table: "TaxonomyDetail",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateByUserId",
                table: "FileEntity",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "FileEntity",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateByUserId",
                table: "EntityType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "EntityType",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SettingEntity",
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
                    table.PrimaryKey("PK_SettingEntity", x => x.Id);
                    table.UniqueConstraint("AK_SettingEntity_Name", x => x.Name);
                    table.ForeignKey(
                        name: "FK_SettingEntity_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SettingEntity_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SettingEntity_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaxonomyEntity",
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
                    Status = table.Column<int>(type: "int", nullable: false),
                    TaxonomyTypeId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxonomyEntity", x => x.Id);
                    table.UniqueConstraint("AK_TaxonomyEntity_Name", x => x.Name);
                    table.ForeignKey(
                        name: "FK_TaxonomyEntity_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaxonomyEntity_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaxonomyEntity_AspNetUsers_LastUpdateByUserId",
                        column: x => x.LastUpdateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaxonomyEntity_TaxonomyType_TaxonomyTypeId",
                        column: x => x.TaxonomyTypeId,
                        principalTable: "TaxonomyType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SettingValue",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SettingEntityId = table.Column<long>(type: "bigint", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SettingValue_SettingEntity_SettingEntityId",
                        column: x => x.SettingEntityId,
                        principalTable: "SettingEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyType_LastUpdateByUserId",
                table: "TaxonomyType",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyDetail_EntityId",
                table: "TaxonomyDetail",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntity_LastUpdateByUserId",
                table: "FileEntity",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityType_LastUpdateByUserId",
                table: "EntityType",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingEntity_CreateByUserId",
                table: "SettingEntity",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingEntity_DeleteByUserId",
                table: "SettingEntity",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingEntity_LastUpdateByUserId",
                table: "SettingEntity",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingValue_SettingEntityId",
                table: "SettingValue",
                column: "SettingEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyEntity_CreateByUserId",
                table: "TaxonomyEntity",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyEntity_DeleteByUserId",
                table: "TaxonomyEntity",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyEntity_LastUpdateByUserId",
                table: "TaxonomyEntity",
                column: "LastUpdateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyEntity_TaxonomyTypeId",
                table: "TaxonomyEntity",
                column: "TaxonomyTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EntityType_AspNetUsers_LastUpdateByUserId",
                table: "EntityType",
                column: "LastUpdateByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_AspNetUsers_LastUpdateByUserId",
                table: "FileEntity",
                column: "LastUpdateByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TaxonomyDetail_TaxonomyEntity_EntityId",
                table: "TaxonomyDetail",
                column: "EntityId",
                principalTable: "TaxonomyEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaxonomyType_AspNetUsers_LastUpdateByUserId",
                table: "TaxonomyType",
                column: "LastUpdateByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EntityType_AspNetUsers_LastUpdateByUserId",
                table: "EntityType");

            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_AspNetUsers_LastUpdateByUserId",
                table: "FileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_TaxonomyDetail_TaxonomyEntity_EntityId",
                table: "TaxonomyDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_TaxonomyType_AspNetUsers_LastUpdateByUserId",
                table: "TaxonomyType");

            migrationBuilder.DropTable(
                name: "SettingValue");

            migrationBuilder.DropTable(
                name: "TaxonomyEntity");

            migrationBuilder.DropTable(
                name: "SettingEntity");

            migrationBuilder.DropIndex(
                name: "IX_TaxonomyType_LastUpdateByUserId",
                table: "TaxonomyType");

            migrationBuilder.DropIndex(
                name: "IX_TaxonomyDetail_EntityId",
                table: "TaxonomyDetail");

            migrationBuilder.DropIndex(
                name: "IX_FileEntity_LastUpdateByUserId",
                table: "FileEntity");

            migrationBuilder.DropIndex(
                name: "IX_EntityType_LastUpdateByUserId",
                table: "EntityType");

            migrationBuilder.DropColumn(
                name: "LastUpdateByUserId",
                table: "TaxonomyType");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "TaxonomyType");

            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "TaxonomyDetail");

            migrationBuilder.DropColumn(
                name: "LastUpdateByUserId",
                table: "FileEntity");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "FileEntity");

            migrationBuilder.DropColumn(
                name: "LastUpdateByUserId",
                table: "EntityType");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "EntityType");

            migrationBuilder.AddColumn<long>(
                name: "TaxonomyId",
                table: "TaxonomyDetail",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Taxonomy",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateByUserId = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    DeleteByUserId = table.Column<string>(nullable: true),
                    DeleteDate = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    TaxonomyTypeId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taxonomy", x => x.Id);
                    table.UniqueConstraint("AK_Taxonomy_Name", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Taxonomy_AspNetUsers_CreateByUserId",
                        column: x => x.CreateByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Taxonomy_AspNetUsers_DeleteByUserId",
                        column: x => x.DeleteByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Taxonomy_TaxonomyType_TaxonomyTypeId",
                        column: x => x.TaxonomyTypeId,
                        principalTable: "TaxonomyType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaxonomyDetail_TaxonomyId",
                table: "TaxonomyDetail",
                column: "TaxonomyId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_CreateByUserId",
                table: "Taxonomy",
                column: "CreateByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_DeleteByUserId",
                table: "Taxonomy",
                column: "DeleteByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Taxonomy_TaxonomyTypeId",
                table: "Taxonomy",
                column: "TaxonomyTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaxonomyDetail_Taxonomy_TaxonomyId",
                table: "TaxonomyDetail",
                column: "TaxonomyId",
                principalTable: "Taxonomy",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
