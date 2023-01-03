/****** Object:  StoredProcedure [dbo].[Booking_SelectById]    Script Date: 1/2/2023 10:23:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Joshua Flores
-- Create date: 12/23/22
-- Description: Selects a Booking by Id
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================



ALTER PROC [dbo].[Booking_SelectById]
			@Id int
AS

/*--------------TEST CODE--------------------------

	DECLARE @Id int = 3

	EXECUTE [dbo].[Booking_SelectById] @Id

*/--------------END TEST CODE-----------------------


BEGIN
	
	SELECT 
		B.Id
		,BT.Id
		,BT.Name as 'Cleaning Type'
		,R.Id
		,R.Name as 'Rate'
		,st.Id
		,st.Name
		,et.Id
		,et.Name
		,B.BookingDate as 'Booking Date'
		,B.BookingStartTime
		,B.BookingEndTime
		,Addresses = (SELECT 
						ad.Id
						,t.Id as 'AddressTypeId'
						,t.Name
						,ad.LineOne
						,ad.LineTwo
						,ad.City
						,ad.Zip
						,ad.State
					 FROM dbo.Address as ad
					 INNER JOIN dbo.AddressTypes as t
					 ON t.Id = ad.AddressTypeId

					 WHERE ad.CreatedBy = B.CreatedBy

					FOR JSON PATH)
		,Contacts = (SELECT
						c.Id
						,c.AvatarUrl
						,c.FirstName
						,c.LastName
						,c.Email
						,c.Phone
						,c.Notes
					FROM dbo.Contacts as c

				    WHERE c.CreatedBy = B.CreatedBy

					FOR JSON PATH)
		,s.Id
		,s.Name as 'Status'

	FROM [dbo].Bookings as B
	INNER JOIN dbo.RateTypes as R
	ON R.Id = B.BookingRateTypeId
	INNER JOIN dbo.BookingTypes as BT
	ON BT.Id = B.BookingTypeId
	INNER JOIN dbo.StatusTypes as s
	ON s.Id = B.StatusTypeId
	INNER JOIN dbo.TimeTypes as st
	ON st.Id = B.BookingStartTypeId
	INNER JOIN dbo.TimeTypes as et
	ON et.Id = B.BookingStartTypeId

	WHERE B.Id = @Id

END
