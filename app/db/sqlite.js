import * as SQLite from 'expo-sqlite';

export class DataBase {
    constructor() {
        this.db = SQLite.openDatabase('dataBase.db', '1.0');

        if (typeof DataBase.instance === 'object') {
            return DataBase.instance;
        }

        DataBase.instance = this;
        return this;
    }
}

function createTableSalesOrder(db) {
    db.transaction(function(txn) {
        txn.executeSql(
            'DROP TABLE IF EXISTS table_pedidos',
            [],
            function(tx, res) {
                console.log('createTableSalesOrder::RES::DROP', res.rows);
            },
            function(tx, error) {
                console.log('createTableSalesOrder::ERROR::DROP', error);
            }
        );
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS
                table_pedidos(
                    pedidoId INTEGER PRIMARY KEY AUTOINCREMENT,
                    clienteId INTEGER KEY,
                    numero TEXT,
                    fecha INTEGER,
                    subtotal REAL,
                    iva REAL,
                    total REAL,
                    enviado INTEGER,
                    procesado INTEGER,
                    asesor INTEGER KEY,
                    createdAt INTEGER,
                    updatedAt INTEGER
                )`,
            [],
            function(tx, resp) {
                console.log('createTableSalesOrder::RES::CREATE', resp.rows);
            },
            function(tx, error) {
                console.log('createTableSalesOrder::ERROR::CREATE', error);
            }
        );
    });
}

export function deleteTable(db, table) {
    console.log(table);
    return new Promise((resolve, reject) => {
        db.transaction(function(txn) {
            txn.executeSql(
                `DELETE FROM ${table}`,
                [],
                function(tx, resDelete) {
                    console.log(`deleteTable::RES::DELETE ${table}`, resDelete);
                    txn.executeSql(
                        'DROP TABLE IF EXISTS table_pedidos',
                        [],
                        function(tx, resDrop) {
                            console.log(`deleteTable::RES::DROP ${table}`, resDrop);
                        },
                        function(tx, errorDrop) {
                            console.log(`deleteTable::ERROR::DROP ${table}`, errorDrop);
                        }
                    );
                    resolve(resDelete);
                },
                function(tx, error) {
                    console.log(`deleteTable::ERROR::DELETE ${table}`, error);
                    reject(error);
                }
            );
        });
    });
}

export function newSalesOrder(db, datos) {
    const {
        cliente_id,
        numero,
        fecha,
        subtotal,
        iva,
        total,
        enviado,
        procesado,
        asesor
    } = datos;

    return new Promise((resolve, reject) => {
        db.transaction(function(txn) {
            txn.executeSql(
                'SELECT name FROM sqlite_master WHERE type="table" AND name="table_pedidos"',
                [],
                function(tx, res) {
                    if (res.rows.length === 0) {
                        createTableSalesOrder(db);
                    }

                    txn.executeSql(
                        `INSERT INTO
                            table_pedidos (
                                clienteId,
                                numero,
                                fecha,
                                subtotal,
                                iva,
                                total,
                                enviado,
                                procesado,
                                asesor,
                                createdAt,
                                updatedAt
                            )
                            VALUES(
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?
                            )`,
                        [
                            cliente_id,
                            numero,
                            fecha,
                            subtotal,
                            iva,
                            total,
                            enviado,
                            procesado,
                            asesor,
                            Date.now(),
                            Date.now()
                        ],
                        function(tx, res) {
                            resolve(res.insertId);
                        },
                        function(tx, error) {
                            console.log(`newSalesOrder::INSERT::ERROR::${error}`);
                            reject(error);
                        }
                    )
                },
                function(tx, error) {
                    console.log(`newSalesOrder::sqlite_master::ERROR::${error}`);
                    reject(error);
                }
            )
        });
    });
}

export function allSalesOrder(db) {
    return new Promise((resolve, reject) => {
        db.transaction(function(txn) {
            txn.executeSql(
                'SELECT name FROM sqlite_master WHERE type="table" AND name="table_pedidos"',
                [],
                function(tx, res) {
                    if (res.rows.length === 0) {
                        createTableSalesOrder(db);
                    }

                    txn.executeSql(
                        `SELECT * FROM table_pedidos`,
                        [],
                        function(tx, res) {
                            resolve(res.rows);
                        },
                        function(tx, error) {
                            console.log(`allSalesOrder::SELECT::ERROR::${error}`);
                            reject(error);
                        }
                    );
                },
                function(tx, error) {
                    console.log(`allSalesOrder::sqlite_master::ERROR::${error}`);
                    reject(error);
                }
            )
        });
    });
}