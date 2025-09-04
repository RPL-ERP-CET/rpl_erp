/*import { NotificationAttachmentsController } from "./notification-attachment.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { CreateNotificationAttachmentDto } from "./dto/create-notification-attachment.dto";
import { NotificationAttachment } from "./notification-attachment.entity";
import { Document } from "../document/document.entity";

describe("NotificationAttachmentsController", () => {
  let controller: NotificationAttachmentsController;
  let service: NotificationsService;

  const mockNotificationId = "notification-id-123";
  const mockDocumentId = "document-id-456";

  const mockAttachmentDto: CreateNotificationAttachmentDto = {
    document_id: mockDocumentId,
  };

  const mockDocument: Partial<Document> = {
    id: mockDocumentId,
    title: "Test Document",
    type: "pdf",
  };

  const mockNotificationAttachment: Partial<NotificationAttachment> = {
    id: "attachment-id-789",
    notification: { id: mockNotificationId } ,
    attachment: { id: mockDocumentId },
  };

  // Create a complete mock service class for the new methods
  class MockNotificationsService implements Partial<NotificationsService> {
    getNotificationAttachments = vi
      .fn()
      .mockImplementation((notificationId: string) => {
        console.log("Mock getting attachments for notification:", notificationId);
        return Promise.resolve([mockDocument as Document]);
      });

    addAttachmentToNotification = vi
      .fn()
      .mockImplementation(
        (notificationId: string, createDto: CreateNotificationAttachmentDto) => {
          console.log("Mock adding attachment:", notificationId, createDto);
          return Promise.resolve(
            mockNotificationAttachment as NotificationAttachment,
          );
        },
      );
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationAttachmentsController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get attachments for a notification and format the response", async () => {
    // Set up spy before the action
    const getAttachmentsSpy = vi.spyOn(service, "getNotificationAttachments");

    // Perform the action
    const result = await controller.getAttachments(mockNotificationId);

    // Assert the result and that the spy was called
    expect(result).toEqual([
      {
        id: mockDocument.id,
        name: mockDocument.title,
        priority: 0,
      },
    ]);
    expect(getAttachmentsSpy).toHaveBeenCalledWith(mockNotificationId);
  });

  it("should add an attachment to a notification", async () => {
    // Set up spy before the action
    const addAttachmentSpy = vi.spyOn(service, "addAttachmentToNotification");

    // Perform the action
    const result = await controller.addAttachment(
      mockNotificationId,
      mockAttachmentDto,
    );

    // Assert the result and that the spy was called with the right arguments
    expect(result).toEqual(mockNotificationAttachment);
    expect(addAttachmentSpy).toHaveBeenCalledWith(
      mockNotificationId,
      mockAttachmentDto,
    );
  });
});
*/
