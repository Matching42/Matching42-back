/**
 * @swagger
 *  components:
 *      schemas:
 *          Team:
 *              type: object
 *              properties:
 *                  ID:
 *                      type: string
 *                  leaderID:
 *                      type: string
 *                  memberID:
 *                      type: array
 *                      items:
 *                        type: string
 *                  subject:
 *                      type: string
 *                  state:
 *                      type: string
 *                      enum: [progress, end, less_member, wait_member]
 *                  startDate:
 *                      type: date
 *                  notionLink:
 *                      type: string
 *                  gitLink:
 *                      type: string
 *                  teamName:
 *                      type: string
 */
