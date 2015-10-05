function Person(fb, id, properties) {
    properties = properties || {};
    this.Name = properties.Name || "";
    this.Age = properties.Age || "";
    this.Address = properties.Address || "";
    this.Phone = properties.Phone || "";
    this.Email = properties.Email || "";
    this.Id = id;
    this.fb = fb;
}

Person.prototype.Save = function(callback) {
    var personRef;
    if (this.id) {
        personRef = fb.child("People/" + this.Id);
        personRef.set(this.Serialize());
    } else {
        personRef = fb.child("People");
        personRef.push(this.Serialize);
    }
}

Person.prototype.Serialize = function() {
    return {
        Name: this.Name,
        Age: this.Age,
        Address: this.Address,
        Phone: this.Phone,
        Email: this.Email
    };
}

Person.prototype.toString = function(){
    return this.Id || JSON.stringify(this.Serialize);
}
