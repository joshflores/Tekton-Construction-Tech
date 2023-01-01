namespace Project.Web.Api.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailAPIContoller : BaseApiController
    {
        private IEmailService _emailService = null;
        public EmailAPIContoller(IEmailService service,
          , ILogger<EmailAPIContoller> logger) : base(logger)
        {
            _emailService = service;
        }

        [HttpPost("contact")]
        public ActionResult<ItemResponse<object>> SendContactUsEmail(ContactForm model)
        {
            ObjectResult result = null;

            try
            {
                _emailService.SendContactUsEmail(model);
                ItemResponse<object> response = new ItemResponse<object>();

                response.Item = DateTime.Now.Ticks;

                result = Ok200(response);
            }
            catch (Exception ex)
            {

                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;

        }
    }
}
