/**
 * @swagger
 * components:
 *  schemas:
 *      song:
 *          type: object
 *          properties:
 *              type:
 *                  type: string
 *                  description: item of the song
 *              subtitle:
 *                  type: object
 *                  description: item of the song
 *              share:
 *                  type: object
 *                  description: item of the song
 *              hub:
 *                  type: object
 *                  description: item of the song
 *              artists:
 *                  type: string
 *                  description: item of the song
 *              layout:
 *                  type: string
 *                  description: item of the song
 *              key:
 *                  type: string
 *                  description: item of the song
 *              title:
 *                  type: string
 *                  description: item of the song
 *              url:
 *                  type: string
 *                  description: item of the song
 *          required:
 *              - type
 *              - subtitle
 *              - share
 *              - images
 *              - hub
 *              - artists
 *              - layout
 *              - key
 *              - title
 *              - url
 *          example:
 *              type: "MUSIC"
 *              subtitle: "Moses Sumney"
 *              share: {}
 *              images: {}
 *              hub: {}
 *              artists: [{}]
 *              layout: "5"
 *              key: "501844142"
 *              title: "Keeps Me Alive"
 *              url: "https://www.shazam.com/track/501844142/keeps-me-alive"
 * 
 * @swagger
 * /songs:
 *  get:
 *    summary: List all songs
 *    tags: [songs]
 *    responses:
 *      200:
 *          description: A list of songs
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/song'
 *      401:
 *          description: Unauthorized
 * 
 * /songs/:id:
 *  get:
 *      summary: List by id of the song
 *      tags: [songs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the song
 *      responses:
 *          200:
 *              description: A song
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/song'
 *          401:
 *              description: Unauthorized
 * @swagger
 * /songs:
 *  post:
 *      summary: Create a new song
 *      tags: [songs]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/song'
 *      responses:
 *          200:
 *              description: A song created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/song'
 *          401:
 *              description: Unauthorized         
 *                          
 * @swagger
 * /songs/:id:
 *  put:
 *      summary: Update a song
 *      tags: [songs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the song
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/song'
 *      responses:
 *          200:
 *              description: A song updated
 *          401:
 *              description: Unauthorized
 * @swagger
 * /songs/:id:
 *  delete:
 *      summary: Delete a song
 *      tags: [songs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the song
 *      responses:
 *          200:
 *              description: A song deleted
 *          401:
 *              description: Unauthorized
 * 
 */