var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("ClubMemberDB", "1.0", "Club Member DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS member');
        var sql = "CREATE TABLE IF NOT EXISTS member ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "address VARCHAR(255), " +
            "phone VARCHAR(50), " +
            "landline VARCHAR(50), " +
            "email VARCHAR(50), " +
            "dateOfBirth VARCHAR(50), " +
            "subgroup VARCHAR(50), " +
            "status VARCHAR(100))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, members) {
        var members = [
                {"id": 1, "firstName": "Susi", "lastName": "Sorglos", "address": "Martinsburg 29 A100, 49078 Osnabrück", "phone": "+49 175 643 60 17", "landline": "", "email": "susi.sorglos@arcor.net", "dateOfBirth": "10-Feb-1992", "subgroup": "Jugend", "status": "Mitarbeiterin"},
                {"id": 2, "firstName": "Peter", "lastName": "Lustig", "address": "Parkstr. 92, 49080 Osnabrück", "phone": "+49 158 442 312 44", "landline": "+49 541 753 132", "email": "plustig@gmx.de", "dateOfBirth": "6-Nov-1989", "subgroup": "1. Mannschaft", "status": "Mitglied"}
            ];
        var l = members.length;
        var sql = "INSERT OR REPLACE INTO member " +
            "(id, firstName, lastName, address, phone, landline, email, dateOfBirth, subgroup, status) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = members[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.address, e.phone, e.landline, e.email, e.dateOfBirth, e.subgroup, e.status],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName " +
                    "FROM member e " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        members = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        members[i] = results.rows.item(i);
                    }
                    callback(members);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.address, e.phone, e.landline, e.email, e.dateOfBirth, e.subgroup, e.status " +
                    "FROM member e " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
