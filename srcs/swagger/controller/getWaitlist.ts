/**
 * @swagger
 * /waitlist:
 *  get:
 *      description: 모든 서브젝트들의 정보와 함께 랜덤매칭대기열의 총 인원수를 반환합니다.
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            data:
 *                              type: array
 *                              items:
 *                                $ref: "#/components/schemas/Waitlist"
 *                            totalWaitingNumber:
 *                              tpye: integer
 *          400:
 *              description: DB에서 Waitlist collection 조회를 실패했을 경우
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            error:
 *                              properties:
 *                               code:
 *                                 type: string
 *                               message:
 *                                 type: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: Error
 *                              message: Error.message
 */
