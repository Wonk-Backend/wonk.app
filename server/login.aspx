<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="YourNamespace.Login" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
    <div class="container">
        <form id="form1" runat="server" method="post" action="/login">
            <div>
                <asp:Label ID="Label1" runat="server" Text="Username:"></asp:Label>
                <asp:TextBox ID="TextBox1" runat="server" CssClass="input-field"></asp:TextBox><br />
                <asp:Label ID="Label2" runat="server" Text="Password:"></asp:Label>
                <asp:TextBox ID="TextBox2" runat="server" TextMode="Password" CssClass="input-field"></asp:TextBox><br />
                <asp:Button ID="Button1" runat="server" Text="Login" CssClass="button" OnClick="Button1_Click" />
            </div>
        </form>
    </div>
</body>
</html>