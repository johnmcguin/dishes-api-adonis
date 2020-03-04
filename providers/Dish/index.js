const { transform, camelCase } = require('lodash')

class DishService {
    constructor(Database) {
        this.db = Database
    }

    /**
     * TODO: This entire thing is probably better as a stored procedure
     */
    async main(userId, whereClause) {
        const query = this.dishView(userId, whereClause)
        const { rows } = await this.db.raw(query)
        return rows.map(this._camelCaseRow)
    }

    dishView(userId, whereClause) {
        let query = `
            SELECT rd.id,
            rd.title,
            rd.description,
            rd.user_id,
            CAST(rd.average_rating AS DOUBLE PRECISION),
            rd.user_rating,
            CASE WHEN favorites.user_id = ${userId} 
            THEN CAST(1 AS BOOLEAN)
            ELSE CAST(0 AS BOOLEAN) END AS user_favorited,
            CASE WHEN bookmarks.user_id = ${userId}
            THEN CAST(1 AS BOOLEAN)
            ELSE CAST(0 AS BOOLEAN) END AS user_bookmarked

            FROM (
                SELECT 
                AVG(r.rating) AS average_rating, 
                r2.rating AS user_rating,
                d.id,
                d.title,
                d.description,
                d.user_id
                FROM dishes d
                LEFT JOIN ratings r 
                ON r.dish_id = d.id
                LEFT JOIN ratings r2
                ON r2.dish_id = d.id AND r2.user_id = ${userId}
                GROUP BY d.id, r2.rating
            ) rd
            LEFT JOIN favorites
            ON favorites.dish_id = rd.id
            LEFT JOIN bookmarks
            ON bookmarks.dish_id = rd.id
        `

        return whereClause ? query.concat(`\n${whereClause}`) : query
    }

    _camelCaseRow(row) {
        return transform(row, (result, value, key) => {
            result[camelCase(key)] = value
            return result
        }, {})
    }
}

module.exports = DishService