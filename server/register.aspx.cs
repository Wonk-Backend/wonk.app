using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace wonk.server
{
    public partial class Register : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpCookie lastVisitCookie = new HttpCookie("LastVisit");
            lastVisitCookie.Value = DateTime.Now.ToString();
            lastVisitCookie.Expires = DateTime.Now.AddYears(1); // Set the cookie to expire in 1 year
            Response.Cookies.Add(lastVisitCookie);
        }

        protected async void Button1_Click(object sender, EventArgs e)
        {
            string username = TextBox1.Text;
            string password = TextBox2.Text;

            using (HttpClient client = new HttpClient())
            {
                var content = new StringContent($"{{\"username\":\"{username}\",\"password\":\"{password}\"}}", Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("http://localhost:3000/api/auth/register", content);

                if (response.IsSuccessStatusCode)
                {
                    // Handle successful registration
                Response.Redirect("https://wonk.app/server/registersuccess.html");
                }
                else
                {
                Response.Redirect("https://wonk.app/server/failure.html");
                    // Handle registration failure
                }
            }
        }
    }
}