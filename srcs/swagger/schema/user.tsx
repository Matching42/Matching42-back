/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  ID:
 *                      type: string
 *                  intraInfo:
 *                      type: object
 *                      properties:
 *                          blakholed_at:
 *                              type: date
 *                          level:
 *                              type: number
 *                  waitMatching:
 *                      type: string
 *                  teamID:
 *                      type: string
 *                  gitID:
 *                      type: string
 *                  cluster:
 *                      type: string
 *                      enum: ['개포', '서초', null]
 *                  deadline:
 *                      type: string
 *                      enum: ['3일', '1주', '2주', '4주', '6주 이상', null]
 */
