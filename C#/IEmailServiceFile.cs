
namespace Project.Web.Api.Controllers
{
    public interface IEmailService
    {
        public void SendContactUsEmail(ContactForm model);
    }
}
