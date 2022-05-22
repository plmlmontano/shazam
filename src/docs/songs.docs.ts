/**
 * 
 * @swagger
 * components:
 *  schemas:
 *      Songs:
 *          type: object
 *          properties:
 *              id: 
 *                  type: string
 *                  description: ObjectId of game
 *              layout: 
 *                  type: string
 *                  description: Name of game
 *              key: 
 *                  type: string
 *                  description: Price of game
 *              title: 
 *                  type: string
 *                  description: Category of game
 *          required:
 *              - layout
 *              - key
 *              - title
 *              
 */

// Traer todas las lista de canciones
/**
 * @swagger
 * /songs:
 *  get:
 *      summary: Trae todas la lista de songs
 *      tags: [songs]
 *      responses:
 *          200:
 *              description: Traer todas las songs
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/songs'
 *
*/