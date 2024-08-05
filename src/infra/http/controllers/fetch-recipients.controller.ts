import { FetchRecipientsUseCase } from '@/domain/delivery/application/use-cases/fetch-recipients'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { RecipientPresenter } from '../presenters/recipient-presenter'

const editRecipienSearchParamsSchema = z.object({
  page: z.number(),
})

type EditRecipienSearchParams = z.infer<typeof editRecipienSearchParamsSchema>

@Controller('/recipients')
export class FetchRecipientsController {
  constructor(private fetchRecipients: FetchRecipientsUseCase) {}

  @Get()
  async handle(@Query() query: EditRecipienSearchParams) {
    const { page } = query

    const result = await this.fetchRecipients.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const recipients = result.value.recipients

    return { recipients: recipients.map(RecipientPresenter.toHTTP) }
  }
}
