/**
 * @swagger
 * /subjectPDF/{subject}:
 *  get:
 *      description: subject PDF 링크를 조회하는 API
 *      parameters:
 *      - in: path
 *        name: subject
 *        type: string
 *        description: PDF 링크를 조회하고자 하는 서브젝트명
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 서브젝트 PDF 링크 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - subjectPDF : 요청한 서브젝트의 PDF 링크
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              subjectPDF:
 *                                  type: string
 *          400:
 *              description: 잘못된 요청으로 인해 PDF 링크 조회 실패
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      code:
 *                                          type: string
 *                                      message:
 *                                          type: string
 *                          example:
 *                              success: false
 *                              error:
 *                                  code: error code
 *                                  message: 'Invalid Subject'
 */