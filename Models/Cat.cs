using System;
using System.Runtime.Serialization;

namespace Models
{
    [DataContract(Namespace = "")]
    public class Cat
    {
        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public string Id { get; set; }

        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public string Name { get; set; }

        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public DateTimeOffset Birth { get; set; }

        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public Mood Mood { get; set; }

        [DataMember(EmitDefaultValue = false, IsRequired = false)]
        public bool Hungry { get; set; }
    }
}
