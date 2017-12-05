using Omi.Modules.ModuleBase;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Dbgroup.WebsiteSetting.Services;
using System.Threading.Tasks;
using System.Linq;
using MimeKit;
using MailKit.Net.Smtp;

namespace Omi.Modules.Dbgroup.Contact
{
    public class ContactController : BaseController
    {
        private readonly WebsiteSettingService _websiteSettingService;
        public ContactController(
            WebsiteSettingService websiteSettingService,
            ILogger<ContactController> logger) : base(logger)
        {
            _websiteSettingService = websiteSettingService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<BaseJsonResult> Send([FromBody]ContactViewModel viewModel)
        {
            var websetting = await _websiteSettingService.GetSetting();

            var fromAddressSetting = websetting.SettingValues.FirstOrDefault(O => O.Name == "ContactSendFromEmail");
            var fromAddressPasswordSetting = websetting.SettingValues.FirstOrDefault(O => O.Name == "ContactSendFromEmailPassword");

            var toAddressSetting = websetting.SettingValues.FirstOrDefault(O => O.Name == "ContactSendToEmail");

            //From Address 
            string FromAddress = fromAddressSetting.Value;
            string FromAdressTitle = "dbgroupvn.com";
            //To Address 
            string ToAddress = toAddressSetting.Value;
            string ToAdressTitle = viewModel.FullName + " | " + viewModel.Phone + " | " + viewModel.Email;
            string Subject = "Contact message from http://dbgroupvn.com";
            string BodyContent = viewModel.Message;

            string SmtpServer = "smtp.gmail.com";
            int SmtpPortNumber = 587;

            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(FromAdressTitle, FromAddress));
            mimeMessage.To.Add(new MailboxAddress(ToAdressTitle, ToAddress));
            mimeMessage.Subject = Subject;
            mimeMessage.Body = new TextPart("plain")
            {
                Text = BodyContent
            };

            using (var client = new SmtpClient())
            {
                client.Connect(SmtpServer, SmtpPortNumber, false);
                // Note: only needed if the SMTP server requires authentication 
                // Error 5.5.1 Authentication  
                client.Authenticate(FromAddress, fromAddressPasswordSetting.Value);
                client.Send(mimeMessage);
                client.Disconnect(true);

                return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, true);
            }
        }
    }
}
