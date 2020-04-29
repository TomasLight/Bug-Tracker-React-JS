using System.ComponentModel.DataAnnotations;

namespace API.Validation
{
	public class CorrectEnumValueAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			if ((int)value == 0)
			{
				return new ValidationResult($"{validationContext.MemberName} cannot be 0");
			}
			
			return ValidationResult.Success;
		}
	}
}