namespace Project.Services
{
    public class EmailService : IEmailService
    {

        private IWebHostEnvironment _environment;
        private AppKeys _appKeys;
        private IDataProvider _data = null;

        public EmailService(IOptions<AppKeys> appKeys, IWebHostEnvironment environment, IDataProvider data)
        {
            _appKeys = appKeys.Value;
            _environment = environment;
            _data = data;
        }

        public void SendContactEmail(ContactForm formData)
        {
            ContentInfo model = new ContentInfo();

            model.senderAddress = _appKeys.SenderAddress;
            model.senderName = "Me";
            model.outSubject = formData.Message;
            model.recAddress = formData.Email;
            model.recName = formData.FirstName + " " + formData.LastName;
            model.pTextContent = "";

            SendContactFormData(model);
        }

        public async void SendContactFormData(ContentInfo model)
        {

            string temp = _environment.WebRootPath + @"\EmailTemplates\EmailTemplate.html";
            string lines;
            lines = System.IO.File.ReadAllText(temp)
                .Replace("{{title}}", "Email Sent!")
                .Replace("{{Main Content}}", "Thank You for contacting us!")
                .Replace("{{Banner}}", "Project Banner")
                .Replace("{{Banner Content}}", "Project Content");

            var from = new EmailAddress(model.senderAddress, model.senderName);
            string subject = model.outSubject;
            var to = new EmailAddress(model.recAddress, model.recName);
            string plainTextContent = model.pTextContent;
            string htmlContent = lines;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            await FinalSendPackage(msg);

        }

        private async Task FinalSendPackage(SendGridMessage msg)
        {
            var apiKey = _appKeys.SENDGRID_API_KEY;
            var client = new SendGridClient(apiKey);
            var response = await client.SendEmailAsync(msg);

        }
    }
}
