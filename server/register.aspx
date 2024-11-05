<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="YourNamespace.Register" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Register</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
    <div class="container">
        <form id="form1" runat="server" method="post" action="/register">
            <div>
                <asp:Label ID="Label1" runat="server" Text="Username:"></asp:Label>
                <asp:TextBox ID="TextBox1" runat="server" CssClass="input-field"></asp:TextBox><br />
                <asp:Label ID="Label2" runat="server" Text="Password:"></asp:Label>
                <asp:TextBox ID="TextBox2" runat="server" TextMode="Password" CssClass="input-field"></asp:TextBox><br />
                <asp:Button ID="Button1" runat="server" Text="Register" CssClass="button" OnClick="Button1_Click" />
            </div>
        </form>
    </div>
</body>
</html>