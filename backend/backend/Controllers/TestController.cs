using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using backend.Models;
using BCrypt.Net;
using System.Security.Cryptography;

namespace backend.Controllers
{
    [RoutePrefix("api")]
    public class TestController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
        SqlCommand cmd = null;
        SqlDataAdapter dataAdapter = null;

        [HttpPost]
        [Route("Signup")]
        public string Signup(User user)
        {
            String message = String.Empty;
            try
            {
                // Encrypt password before storing
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

                cmd = new SqlCommand("AddUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", hashedPassword);

                conn.Open();

                int i = cmd.ExecuteNonQuery();
                conn.Close();

                if (i > 0)
                {
                    message = "User added Succesfully";
                }
                else
                {
                    message = "An Error occured";
                }

            }
            catch (Exception ex)
            {
                message = ex.Message;
            }
            return message;

        }

        [HttpPost]
        [Route("Signin")]
        public SignInResponse Signin(User user)
        {
            SignInResponse response = new SignInResponse();
            try
            {
                dataAdapter = new SqlDataAdapter("GetUsersByEmail", conn);
                dataAdapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                dataAdapter.SelectCommand.Parameters.AddWithValue("@Email", user.Email);
                DataTable dt = new DataTable();
                dataAdapter.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    // Verify password
                    string hashedPasswordFromDB = dt.Rows[0]["Password"].ToString();
                    if (BCrypt.Net.BCrypt.Verify(user.Password, hashedPasswordFromDB))
                    {
                        response.Message = "User is valid";

                        // Populate user details
                       
                        response.UserDetails = new User
                        {
                            FullName = dt.Rows[0]["FullName"].ToString(),
                            Email = dt.Rows[0]["Email"].ToString() 
                        };
                    }
                    else
                    {
                        response.Message = "Invalid credentials";
                    }
                }
                else
                {
                    response.Message = "User does not exist";
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

    }
}
