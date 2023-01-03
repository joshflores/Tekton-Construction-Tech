/****** Object:  StoredProcedure [dbo].[Booking_Update]    Script Date: 1/2/2023 10:24:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[Booking_Update]
				@BookingType int
				,@BookingRateType int
				,@BookingStartType int
				,@BookingEndType int
				,@BookingDate nvarchar(50)
				,@BookingStartTime nvarchar(50)
				,@BookingEndTime nvarchar(50)				
				,@BookingAddressType int
				,@BookingContactType int
				,@StatusType int
				,@UserId int
				,@Id int
AS

/*--------------TEST CODE--------------------------

		DECLARE @BookingType int = 1
				,@RateType int = 1
				,@BookingStartType int = 1
				,@BookingEndType int = 2
				,@BookingDate nvarchar(50) = '12/24/2022'
				,@BookingStartTime nvarchar(50) = '9:00'
				,@BookingEndTime nvarchar(50) = '3:00'				
				,@BookingAddressType int = 1
				,@BookingContactType int = 1
				,@StatusType int = 1
				,@UserId int = 5
				,@Id int = 1

		EXECUTE [dbo].[Booking_Update]
				@BookingType
				,@RateType 
				,@BookingStartType
				,@BookingEndType
				,@BookingDate
				,@BookingStartTime
				,@BookingEndTime
				,@BookingAddressId
				,@BookingContact
				,@StatusType
				,@UserId
				,@Id
		  
		SELECT * FROM dbo.Bookings
		WHERE @Id = Id		

*/--------------END TEST CODE-----------------------



BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE()

	UPDATE [dbo].[Bookings]
		SET [BookingTypeId] = @BookingType
		,[BookingRateTypeId] = @BookingRateType
		,[BookingStartTypeId] = @BookingStartType
		,[BookingEndTypeId] = @BookingEndType
		,[BookingDate] = @BookingDate
		,[BookingStartTime] = @BookingStartTime
		,[BookingEndTime] = @BookingEndTime
		,[BookingAddressId] = @BookingAddressType
		,[BookingContactId] = @BookingContactType
		,[StatusTypeId] = @StatusType
		,[ModifiedBy] = @UserId
 		,[DateModified] = @DateModified

	WHERE @Id = Id

END
