using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Models
{
    [DataContract(Namespace="")]
    public enum Mood
    {
        [EnumMember]
        None = 0,
        [EnumMember]
        Red = 1,
        [EnumMember]
        Amber = 2,
        [EnumMember]
        Green = 3
    }
}
