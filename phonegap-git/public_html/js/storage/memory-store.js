var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var members = this.members.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, members);
    }

    this.findById = function(id, callback) {
        var members = this.members;
        var member = null;
        var l = members.length;
        for (var i=0; i < l; i++) {
            if (members[i].id === id) {
                member = members[i];
                break;
            }
        }
        callLater(callback, member);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.members = [
            {"id": 1, "firstName": "Susi", "lastName": "Sorglos", "address": "Martinsburg 29 A100, 49078 Osnabrück", "phone": "+49 175 643 60 17", "landline": "", "email": "susi.sorglos@arcor.net", "dateOfBirth": "10-Feb-1992", "subgroup": "Jugend", "status": "Mitarbeiterin"},
            {"id": 2, "firstName": "Peter", "lastName": "Lustig", "address": "Parkstr. 92, 49080 Osnabrück", "phone": "+49 158 442 312 44", "landline": "+49 541 753 132", "email": "plustig@gmx.de", "dateOfBirth": "6-Nov-1989", "subgroup": "1. Mannschaft", "status": "Mitglied"}
     
        ];

    callLater(successCallback);

}