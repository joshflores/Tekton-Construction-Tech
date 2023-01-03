ALTER PROC [dbo].[Booking_Insert]
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
				,@Id int OUTPUT
AS

/*--------------TEST CODE--------------------------

		DECLARE @BookingType int = 1
				,@RateType int = 1
				,@BookingRateType nvarchar(50) = '12/24/2022'
			    ,@BookingStartType int = 1 
				,@BookingEndType int = 2
				,@BookingStartTime nvarchar(50) = '9:00'
				,@BookingEndTime nvarchar(50) = '3:00'
				,@BookingAddressType int = 1
				,@BookingContactType int = 1
				,@StatusType int = 1
				,@UserId int = 5
				,@Id int

		EXECUTE [dbo].[Booking_Insert]
				@BookingType
				,@BookingRateType 
				,@BookingDate 
				,@BookingStartType
				,@BookingEndType
				,@BookingStartTime
				,@BookingEndTime
				,@BookingAddressId
				,@BookingContact
				,@StatusType
				,@UserId
				,@Id OUTPUT
		  
		SELECT * FROM dbo.Bookings
		WHERE @Id = Id		

*/--------------END TEST CODE-----------------------



BEGIN
	
	DECLARE @DateCreated datetime2(7) = GETUTCDATE()

	INSERT INTO dbo.Bookings
		([BookingTypeId]
		,[BookingRateTypeId]
		,[BookingStartTypeId]
		,[BookingEndTypeId]
		,[BookingDate]
		,[BookingStartTime]
		,[BookingEndTime]
		,[BookingAddressId]
		,[BookingContactId]
		,[StatusTypeId]
		,[CreatedBy]
		,[DateCreated])

	VALUES
		(@BookingType
		,@BookingRateType
		,@BookingStartType
		,@BookingEndType
		,@BookingDate
		,@BookingStartTime
		,@BookingEndTime
		,@BookingAddressType
		,@BookingContactType
		,@StatusType
		,@UserId
		,@DateCreated)

	SET @Id = SCOPE_IDENTITY()

END
