import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let mockOrderService: Partial<Record<keyof OrderService, jest.Mock>>;

  const mockedData: OrderDto = {
    email: 'test@example.com',
    phone: '1234567890',
    tickets: [
      {
        film: 'film-id',
        session: 'session-id',
        daytime: new Date(),
        row: 1,
        seat: 5,
        price: 100,
      },
    ],
  };

  beforeEach(async () => {
    mockOrderService = {
      create: jest.fn().mockResolvedValue({
        total: 1,
        items: [],
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: OrderService,
          useValue: mockOrderService, // Мок-репозиторий
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Проверка создания заказа', async () => {
    const result = await controller.createOrder(mockedData);
    expect(result).toEqual({
      total: 1,
      items: [],
    });
    expect(mockOrderService.create).toHaveBeenCalledWith(mockedData);
  });
});
