using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Models
{
    [DataContract(Namespace = "")]
    public class Login
    {
        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public User User { get; set; }
        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public string ReturnUrl { get; set; }
    }
}
