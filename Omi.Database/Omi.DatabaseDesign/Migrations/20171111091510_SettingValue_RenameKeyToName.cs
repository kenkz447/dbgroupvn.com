using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Omi.DatabaseDesign.Migrations
{
    public partial class SettingValue_RenameKeyToName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "SettingValue");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SettingValue",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "SettingValue");

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "SettingValue",
                nullable: true);
        }
    }
}
