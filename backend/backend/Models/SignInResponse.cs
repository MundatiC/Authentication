using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class SignInResponse
    {
        public string Message { get; set; }
        public User UserDetails { get; set; }
    }
}