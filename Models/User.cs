using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Models
{
    [DataContract(Namespace = "")]
    public class User
    {
        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public string Id { get; set; }
        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public string Password { get; set; }
    }
}
