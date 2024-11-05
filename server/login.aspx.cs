using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace YourNamespace
{
    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Log to the console that the page has loaded
            Console.WriteLine("Page loaded.");
        }

        protected async void Button1_Click(object sender, EventArgs e)
        {
            string username = TextBox1.Text;
            string password = TextBox2.Text;

            using (HttpClient client = new HttpClient())
            {
                var content = new StringContent($"{{\"username\":\"{username}\",\"password\":\"{password}\"}}", Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("http://localhost:3000/api/auth/login", content);

                if (response.IsSuccessStatusCode)
                {
                    response.redirect('https://wonk.app/');
                }
                else
                {
                    response.redirect('https://wonk.app/server/failure.html');
                }
            }
        }
    }
}